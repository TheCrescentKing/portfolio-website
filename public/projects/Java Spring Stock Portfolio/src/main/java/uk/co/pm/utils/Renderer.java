package uk.co.pm.utils;

import spark.ModelAndView;
import spark.template.velocity.VelocityTemplateEngine;

import java.util.Map;

public class Renderer {

    // This takes our Model map and the location of our template & turns it into html, using Apache Velocity
    public static String render(Map<String, Object> model, String templatePath) {
        return new VelocityTemplateEngine().render(new ModelAndView(model, templatePath));
    }

}
