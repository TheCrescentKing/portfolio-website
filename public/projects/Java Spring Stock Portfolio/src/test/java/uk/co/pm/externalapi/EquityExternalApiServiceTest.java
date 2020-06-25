package uk.co.pm.externalapi;

import com.github.tomakehurst.wiremock.junit.WireMockRule;
import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import uk.co.pm.FileTestUtils;
import uk.co.pm.SocketTestUtils;
import uk.co.pm.model.Equity;

import java.util.List;

import static com.github.tomakehurst.wiremock.client.WireMock.get;
import static com.github.tomakehurst.wiremock.client.WireMock.okJson;
import static com.github.tomakehurst.wiremock.client.WireMock.stubFor;
import static com.github.tomakehurst.wiremock.client.WireMock.urlEqualTo;
import static org.assertj.core.api.Assertions.assertThat;

public class EquityExternalApiServiceTest {

    private static final int PORT = SocketTestUtils.findAvailablePort();

    @Rule
    public WireMockRule wireMockRule = new WireMockRule(PORT);

    private EquityExternalApiService equityExternalApiService;


    @Before
    public void setUp() throws Exception {
        equityExternalApiService = new EquityExternalApiService("http://localhost:" + PORT);
    }

    @Test
    public void getEquity() throws Exception{
        String body = FileTestUtils.readClasspathFile("/json/equities.json");

        stubFor(get(urlEqualTo("/equities"))
                .willReturn(okJson(body)));

        List<Equity> equities = equityExternalApiService.getEquities();

        assertThat(equities).hasSize(2);
        assertThat(equities.get(0).getEpic()).isEqualTo("III");
        assertThat(equities.get(0).getCompanyName()).isEqualTo("3I GROUP PLC");
        assertThat(equities.get(0).getAssetType()).isEqualTo("Equity");
        assertThat(equities.get(0).getSector()).isEqualTo("Financials");
        assertThat(equities.get(0).getCurrency()).isEqualTo("GBP");
        assertThat(equities.get(1).getEpic()).isEqualTo("ADN");
        assertThat(equities.get(1).getCompanyName()).isEqualTo("ABERDEEN ASSET MANAGEMENT PLC");
        assertThat(equities.get(1).getAssetType()).isEqualTo("Equity");
        assertThat(equities.get(1).getSector()).isEqualTo("Financials");
        assertThat(equities.get(1).getCurrency()).isEqualTo("GBP");
    }
}