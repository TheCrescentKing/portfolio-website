package uk.co.pm.externalapi;

import com.github.tomakehurst.wiremock.junit.WireMockRule;
import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import uk.co.pm.FileTestUtils;
import uk.co.pm.SocketTestUtils;
import uk.co.pm.model.Price;

import java.util.List;

import static com.github.tomakehurst.wiremock.client.WireMock.*;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.fail;

/**
 * Created by nellieoliver on 11/03/2018.
 */
public class QuarterTest
{
    private static final int PORT = SocketTestUtils.findAvailablePort();

    @Rule
    public WireMockRule wireMockRule = new WireMockRule(PORT);

    private PriceExternalApiService equityExternalApiService;


    @Before
    public void setUp() throws Exception {
        equityExternalApiService = new PriceExternalApiService("http://localhost:" + PORT);
    }
    @Test
    public void check_contains_only_Q1() throws Exception{

        String body = FileTestUtils.readClasspathFile("/json/prices.json");

        stubFor(get(urlEqualTo("/prices/20015-Q1"))
                .willReturn(okJson(body)));

        List<Price> quarter = equityExternalApiService.getPrices_Quarter("20015-Q1");

        assertThat(quarter.get(0).getDateTime().equals("20015-Q1"));
        assertThat(quarter.get(1).getDateTime().equals("20015-Q1"));
    }

    @Test
    public void check_contains_only_Q2() throws Exception{
        String body = FileTestUtils.readClasspathFile("/json/prices.json");

        stubFor(get(urlEqualTo("/prices/20015-Q2"))
                .willReturn(okJson(body)));

        List<Price> quarter = equityExternalApiService.getPrices_Quarter("20015-Q2");
        assertThat(quarter.get(0).getDateTime().equals("20015-Q2"));
        assertThat(quarter.get(1).getDateTime().equals("20015-Q2"));
    }

    @Test
    public void checkQ1hasCorrectEpic() throws Exception{
        String body = FileTestUtils.readClasspathFile("/json/prices.json");

        stubFor(get(urlEqualTo("/prices/20015-Q1"))
                .willReturn(okJson(body)));

        List<Price> quarter = equityExternalApiService.getPrices_Quarter("20015-Q1");
        assertThat(quarter.get(0).getEpic().equals("NEL"));
        assertThat(quarter.get(1).getEpic().equals("MIC"));
    }

    @Test
    public void checkQ1hasCorrectCurrency() throws Exception{
        String body = FileTestUtils.readClasspathFile("/json/prices.json");

        stubFor(get(urlEqualTo("/prices/20015-Q1"))
                .willReturn(okJson(body)));

        List<Price> quarter = equityExternalApiService.getPrices_Quarter("20015-Q1");
        for(int i = 0; i < quarter.size() - 1; i++){
            if(!quarter.get(i).getCurrency().equals("GBP")){
                fail("Wrong Currency");
            }else{
                assertThat(quarter.get(i).getDateTime().equals("GBP"));
            }
        }
    }

    @Test
    public void checkQ2hasCorrectEpic() throws Exception{
        String body = FileTestUtils.readClasspathFile("/json/prices.json");

        stubFor(get(urlEqualTo("/prices/20015-Q2"))
                .willReturn(okJson(body)));

        List<Price> quarter = equityExternalApiService.getPrices_Quarter("20015-Q2");
        assertThat(quarter.get(0).getEpic().equals("CLA"));
        assertThat(quarter.get(1).getEpic().equals("GEO"));
    }

    @Test
    public void checkQ2hasCorrectCurrency() throws Exception{
        String body = FileTestUtils.readClasspathFile("/json/prices.json");

        stubFor(get(urlEqualTo("/prices/20015-Q2"))
                .willReturn(okJson(body)));

        List<Price> quarter = equityExternalApiService.getPrices_Quarter("20015-Q2");
        for(int i = 0; i < quarter.size() - 1; i++){
            if(!quarter.get(i).getCurrency().equals("GBP")){
                fail("Wrong Currency");
            }else{
                assertThat(quarter.get(i).getDateTime().equals("GBP"));
            }
        }
    }
}

