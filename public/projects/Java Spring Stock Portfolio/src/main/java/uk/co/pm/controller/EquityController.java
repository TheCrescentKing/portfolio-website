package uk.co.pm.controller;

import com.google.gson.Gson;
import spark.Request;
import spark.Response;
import spark.Route;
import uk.co.pm.externalapi.EquityExternalApiService;
import uk.co.pm.model.CSV;
import uk.co.pm.model.Equity;
import uk.co.pm.model.Price;

import com.google.common.io.ByteStreams;
import com.google.common.io.Closeables;
import com.google.common.net.MediaType;
import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static spark.Spark.get;
import static uk.co.pm.utils.Renderer.render;
import static uk.co.pm.utils.ResponseTypeUtil.shouldReturnHtml;

public class EquityController {

	private Gson gson;
	private final EquityExternalApiService equityExternalApiService;

	private static final File FAVICON_PATH = new File("src/main/resources/favicon.ico");
	private static final Log LOG = LogFactory.getLog(EquityController.class);

	CSV write = new CSV();
	String message = "Save successful!";

	public EquityController(String remoteApiBaseUrl) {
		this.gson = new Gson();
		this.equityExternalApiService = new EquityExternalApiService(remoteApiBaseUrl);
		setupRoutes();
	}

	private void setupRoutes() {

		get("/favicon.ico", new Route(){
			@Override
			public Object handle(Request request, Response response) {

				try {
					InputStream in = null;
					OutputStream out = null;
					try {
						in = new BufferedInputStream(new FileInputStream(FAVICON_PATH));
						out = new BufferedOutputStream(response.raw().getOutputStream());
						response.raw().setContentType(MediaType.ICO.toString());
						response.status(200);
						ByteStreams.copy(in, out);
						out.flush();
						return "";
					} finally {
						Closeables.close(in, true);
					}
				} catch (FileNotFoundException ex) {
					LOG.warn(ex);
					response.status(404);
					return ex.getMessage();
				} catch (IOException ex) {
					LOG.warn(ex);
					response.status(500);
					return ex.getMessage();
				}
			}
		});

		get("/equities", (Request request, Response response) -> {
			// call the external api
			List<Equity> equities = equityExternalApiService.getEquities();
			List<String> sectors = getSectors();
			List<Integer> occurrences = getOccurrences();
			// Here, we check whether the request is for html, or whether we should return
			// JSON
			if (shouldReturnHtml(request)) {
				Map<String, Object> model = new HashMap<>();
				model.put("equities", equities);
				model.put("sectors", sectors);
				model.put("occurrences", occurrences);

				return render(model, "templates/equities.vm");

			} else {
				return gson.toJson(equities);
			}
		});

		get("/equities/export", (Request request, Response response) -> {
			// call the external api
			List<Equity> equities = equityExternalApiService.getEquities();
			write.setHeader("EPIC, Company name, Asset Type, Sector, Currency");
			return write.writeCsvFile("Equities.csv", equities);
		});
		
		get("/prices", (Request request, Response response) -> {
			// call the external api
			List<Price> prices = equityExternalApiService.getPrices();
			List<Price> q1 = new ArrayList<Price>();
			List<Price> q2 = new ArrayList<Price>();
			
			for (Price p : prices) {
				if (p.getDateTime() == "20015-Q1")
					q1.add(p);
				else
					q2.add(p);
			}

			// Here, we check whether the request is for html, or whether we should return
			// JSON
			if (shouldReturnHtml(request)) {
				Map<String, Object> model = new HashMap<>();
				model.put("prices", prices);
				model.put("q1", q1);
				model.put("q2", q2);
				return render(model, "templates/prices.vm");

			} else {
				return gson.toJson(prices);
			}
		});
		
		get("/prices/export", (Request request, Response response) -> {
			// call the external api
			List<Price> prices = equityExternalApiService.getPrices();

			write.setHeader("EPIC, Date Time, Mid Price, Currency");
			return write.writeCsvFile("Prices.csv", prices);
		});

		get("/equities/:epic", (Request request, Response response) -> {
			// call the external api
			List<String> sectors = getSectors();
			List<Equity> equities = equityExternalApiService.getEquities();
			List<Equity> finalEquity = new ArrayList<>();
			for (Equity currentEpic : equities) {
				if (currentEpic.getEpic().equals(request.params(":epic"))) {
					finalEquity.add(currentEpic);
				}
			}
			// Here, we check whether the request is for html, or whether we should return
			// JSON
			if (shouldReturnHtml(request)) {
				Map<String, Object> model = new HashMap<>();
				model.put("equities", finalEquity);
				model.put("sectors", sectors);
				return render(model, "templates/equitiesEpic.vm");

			} else {
				return gson.toJson(finalEquity);
			}
		});
		
		get("/equities/:epic/export", (Request request, Response response) -> {
			// call the external api
			List<Equity> equities = equityExternalApiService.getEquities();
			List<Equity> finalEquity = new ArrayList<>();
			for (Equity currentEpic : equities) {
				if (currentEpic.getEpic().equals(request.params(":epic"))) {
					finalEquity.add(currentEpic);
				}
			}
			write.setHeader("EPIC, Company name, Asset Type, Sector, Currency");
			return write.writeCsvFile("Epic.csv", finalEquity);
		});

		get("/equities/a/:sector", (Request request, Response response) -> {
			// call the external api
			List<String> sectors = getSectors();
			String sector = request.params(":sector");
			List<Price> finalEquityList = getEquitiesAccordingToSector(sector);

			// Here, we check whether the request is for html, or whether we should return
			// JSON
			if (shouldReturnHtml(request)) {
				Map<String, Object> model = new HashMap<>();
				model.put("sector", sector);
				model.put("sectors", sectors);
				model.put("prices", finalEquityList);
				return render(model, "templates/sector.vm");

			} else {
				return gson.toJson(finalEquityList);
			}
		});

		get("/equities/b/:sectorPrice", (Request request, Response response) -> {
			//call the external api
			List<Equity> equities = equityExternalApiService.getEquities();
			List<Price> prices = equityExternalApiService.getPrices();
			List<Price> finalEquityList = new ArrayList<>();
			for (Equity currentEquity : equities){
				if (currentEquity.getSector().equals(request.params(":sectorPrice"))){
					for (Price currentEpicPrice : prices){
						if (currentEpicPrice.getEpic().equals(currentEquity.getEpic())){
							finalEquityList.add(currentEpicPrice);
						}
					}
				}
			}
			//Here, we check whether the request is for html, or whether we should return JSON
			if (shouldReturnHtml(request)) {
				Map<String, Object> model = new HashMap<>();
				model.put("prices", finalEquityList);
				return render(model, "templates/sectorPrice.vm");

			} else {
				return gson.toJson(finalEquityList);
			}
		});

		get("/equities/a/:sector/export", (Request request, Response response) -> {
			// call the external api
			List<Price> finalEquityList = getEquitiesAccordingToSector(request.params(":sector"));
			
			write.setHeader("EPIC, Date Time, Mid Price, Currency");
			return write.writeCsvFile("Sector.csv", finalEquityList);
		});

		// As a user, I want to be able view prices by quarter so that I can analyse a
		// particular quarter in isolation.
		get("/prices/:quarter", (Request request, Response response) -> {
			// call the external api
			List<Price> priceList = equityExternalApiService.getPrices();
			List<Price> quarter_price = new ArrayList<>();
			List<String> sectors = getSectors();
			for (Price current_price : priceList) {
				if (current_price.getDateTime().equals(request.params(":quarter"))) { // check that the quarter is
																						// correct
					// for (Price epic_price : priceList){ //now loop through the equities to get
					// the EPICS
					// if (epic_price.getEpic().equals(current_price.getEpic())){ //match
					quarter_price.add(current_price); // add to the epic
				}
				// }
				// }
			}
			// Here, we check whether the request is for html, or whether we should return
			// JSON*/
			if (shouldReturnHtml(request)) {
				Map<String, Object> model = new HashMap<>();
				model.put("quarter_prices", quarter_price);
				model.put("chosen_quarter", request.params(":quarter"));
				model.put("sectors", sectors);
				return render(model, "templates/quarter.vm");
			} else {
				return gson.toJson(quarter_price);
			}
		});

		get("/prices/:quarter/export", (Request request, Response response) -> {
			// call the external api
			List<Price> priceList = equityExternalApiService.getPrices();
			List<Price> quarter_price = new ArrayList<>();
			for (Price current_price : priceList) {
				if (current_price.getDateTime().equals(request.params(":quarter"))) { 
					quarter_price.add(current_price); // add to the epic
				}
			}
			write.setHeader("EPIC, Quarter, Mid Price, Currency");
			return write.writeCsvFile("Quarter.csv", quarter_price);
		});
	}

	private List<String> getSectors() throws IOException{
		List<String> sectors = new ArrayList<String>();
		List<Equity> equities = equityExternalApiService.getEquities();

		for (Equity equity : equities) {
			if (!sectors.contains(equity.getSector())) {
				sectors.add(equity.getSector());
				for (Equity e : equities ) {
					if (e.getSector().equals(equity.getSector())) {
					}
				}
			}
		}
		return sectors;
	}

	private List<Integer> getOccurrences() throws IOException{
		List<String> sectors = new ArrayList<String>();
		List<Integer> occurrences = new ArrayList<Integer>();
		List<Equity> equities = equityExternalApiService.getEquities();
		int count = 0;

		for (Equity equity : equities) {
			if (!sectors.contains(equity.getSector())) {
				sectors.add(equity.getSector());
				for (Equity e : equities ) {
					if (e.getSector().equals(equity.getSector())) {
						count++;
					}
				}
				occurrences.add(count);
				count = 0;
			}
		}
		return occurrences;
	}

	private List<Price> getEquitiesAccordingToSector(String sector) throws IOException{
		List<Equity> equities = equityExternalApiService.getEquities();
		List<Price> prices = equityExternalApiService.getPrices();
		List<Price> finalEquityList = new ArrayList<>();

		for (Equity currentEquity : equities) {
			if (currentEquity.getSector().equals(sector)){
				for (Price currentEpicPrice : prices) {
					if (currentEpicPrice.getEpic().equals(currentEquity.getEpic())) {
						finalEquityList.add(currentEpicPrice);
					}
				}
			}
		}

		return finalEquityList;
	}
}
