package uk.co.pm.externalapi;

import com.github.tomakehurst.wiremock.junit.WireMockRule;
import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import uk.co.pm.FileTestUtils;
import uk.co.pm.SocketTestUtils;
import uk.co.pm.model.Person;

import java.util.List;

import static com.github.tomakehurst.wiremock.client.WireMock.get;
import static com.github.tomakehurst.wiremock.client.WireMock.okJson;
import static com.github.tomakehurst.wiremock.client.WireMock.stubFor;
import static com.github.tomakehurst.wiremock.client.WireMock.urlEqualTo;
import static org.assertj.core.api.Assertions.assertThat;

public class PersonExternalApiServiceTest {

    private static final int PORT = SocketTestUtils.findAvailablePort();

    @Rule
    public WireMockRule wireMockRule = new WireMockRule(PORT);

    private PersonExternalApiService personExternalApiService;


    @Before
    public void setUp() throws Exception {
        personExternalApiService = new PersonExternalApiService("http://localhost:" + PORT);
    }

    @Test
    public void getPerson() throws Exception{
        String body = FileTestUtils.readClasspathFile("/json/people.json");

        stubFor(get(urlEqualTo("/people"))
                        .willReturn(okJson(body)));

        List<Person> people = personExternalApiService.getPeople();

        assertThat(people).hasSize(2);
        assertThat(people.get(0).getAge()).isEqualTo(35);
        assertThat(people.get(0).getName()).isEqualTo("Susan");
        assertThat(people.get(1).getAge()).isEqualTo(42);
        assertThat(people.get(1).getName()).isEqualTo("Enrique");
    }

}