package uk.co.pm.externalapi;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import uk.co.pm.model.Person;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

import java.io.IOException;
import java.util.List;

public class PersonExternalApiService {

    //This is used to communicate with the extenal API (http://square.github.io/okhttp/)
    private OkHttpClient client;
    //This is used for converting back & forth between JSON and java objects (https://github.com/google/gson)
    private Gson gson;
    private String baseUrl;

    //This is used to turn a json representation of a list of Person into a List<Person>
    //If this was to be a list of another type, it would just be changed to TypeToken<List<MyType>>
    private TypeToken<List<Person>> personListTypeToken = new TypeToken<List<Person>>() {
    };

    public PersonExternalApiService(String baseUrl) {
        this.client = new OkHttpClient();
        this.gson = new Gson();
        this.baseUrl = baseUrl;
    }

    public List<Person> getPeople() throws IOException {
        String url = baseUrl + "/people";

        //Create a okHttp "request"
        Request request = new Request.Builder()
                .url(url)
                .build();

        //Use the okHttp client to make a call, using our request object, returning a response
        Response response = client.newCall(request).execute();

        //Extract the response body as a string
        String responseString = response.body().string();
        //use Gson to turn your json string into a list of Person objects
        List<Person> people = gson.fromJson(responseString, personListTypeToken.getType());
        return people;
    }
}
