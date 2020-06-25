package uk.co.pm.utils;

import spark.Request;

public class ResponseTypeUtil {

    //This is a little helper to work out whether the user requested HTML or not
    public static boolean shouldReturnHtml(Request request) {
        String accept = request.headers("Accept");
        return accept != null && accept.contains("text/html");
    }
}
