package uk.co.pm.model;

import org.junit.Test;

import static org.hamcrest.CoreMatchers.equalTo;
import static org.junit.Assert.*;


public class JUnitPriceTest {
    @Test
    public void testConstructingPrice() throws Exception {
        String expectedEpic = "NEL";
        String expectedDateTime = "20015-Q1";
        String expectedMidPrice = "4.89";
        String expectedCurrency = "GBP";

        Price price = new Price(expectedEpic, expectedDateTime, expectedMidPrice, expectedCurrency);

        assertThat(price.getEpic(), equalTo(expectedEpic));
        assertThat(price.getDateTime(), equalTo(expectedDateTime));
        assertThat(price.getMidPrice(), equalTo(expectedMidPrice));
        assertThat(price.getCurrency(), equalTo(expectedCurrency));
    }

    @Test
    public void testEpic() throws Exception {
        Price price = new Price();
        price.setEpic("NEL");
        assertThat(price.getEpic(), equalTo("NEL"));
    }

    @Test
    public void testDateTime() throws Exception {
        Price price = new Price();
        price.setDateTime("20015-Q1");
        assertThat(price.getDateTime(), equalTo("20015-Q1"));
    }

    @Test
    public void testMidPrice() throws Exception {
        Price price = new Price();
        price.setMidPrice("4.89");
        assertThat(price.getMidPrice(), equalTo("4.89"));
    }

    @Test
    public void testCurrency() throws Exception {
        Price price = new Price();
        price.setCurrency("GBP");
        assertThat(price.getCurrency(), equalTo("GBP"));
    }
}