package uk.co.pm;

import uk.co.pm.controller.EquityController;
import uk.co.pm.controller.HelloController;

import static spark.Spark.port;

public class PortfolioManagerApplication {

    public static void main(String[] args) {
        port(getAssignedPort());
        String remoteApiBaseUrl = "https://portfolio-manager-api.herokuapp.com";
        new HelloController(remoteApiBaseUrl);
        new EquityController(remoteApiBaseUrl);
    }

    //This will be used when we push to a cloud server
    private static int getAssignedPort() {
        ProcessBuilder processBuilder = new ProcessBuilder();
        if (processBuilder.environment().get("PORT") != null) {
            return Integer.parseInt(processBuilder.environment().get("PORT"));
        }
        return 4567; // this port is what is used for running on localhost
    }
}
