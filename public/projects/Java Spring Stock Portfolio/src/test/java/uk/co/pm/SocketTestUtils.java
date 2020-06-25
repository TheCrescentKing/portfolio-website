package uk.co.pm;

import java.net.InetAddress;
import java.net.ServerSocket;
import java.util.Random;

import javax.net.ServerSocketFactory;

public abstract class SocketTestUtils {

    private static final Random RANDOM = new Random(System.currentTimeMillis());

    private SocketTestUtils() {

    }

    public static int findAvailablePort() {
        int portRange = 64511;
        int candidatePort;
        int searchCounter = 0;
        do {
            if (searchCounter > portRange) {
                throw new IllegalStateException(String.format(
                        "Could not find an available tcp port in the range [1024, 65535] after %d attempts",
                        searchCounter));
            }
            candidatePort = findRandomPort();
            searchCounter++;
        }
        while (!isPortAvailable(candidatePort));

        return candidatePort;
    }

    private static boolean isPortAvailable(int port) {
        try {
            ServerSocket serverSocket = ServerSocketFactory.getDefault().createServerSocket(
                    port, 1, InetAddress.getByName("localhost"));
            serverSocket.close();
            return true;
        }
        catch (Exception ex) {
            return false;
        }
    }

    private static int findRandomPort() {
        return 1024 + RANDOM.nextInt(64511 + 1);
    }
}
