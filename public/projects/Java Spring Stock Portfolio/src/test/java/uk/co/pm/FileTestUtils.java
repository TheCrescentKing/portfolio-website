package uk.co.pm;

import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.nio.charset.Charset;

import org.apache.commons.io.IOUtils;

public abstract class FileTestUtils {

    private FileTestUtils() {

    }

    public static String readClasspathFile(String path) throws IOException {
        URL resource = FileTestUtils.class.getResource(path);

        try (InputStream inputStream = resource.openStream()) {
            return IOUtils.toString(inputStream, Charset.forName("UTF-8"));
        }
    }

}
