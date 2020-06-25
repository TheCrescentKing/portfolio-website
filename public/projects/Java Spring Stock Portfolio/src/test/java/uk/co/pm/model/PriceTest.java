package uk.co.pm.model;

import static org.junit.Assert.assertThat;
import static org.hamcrest.CoreMatchers.equalTo;

import org.junit.Test;
import uk.co.pm.model.Price;

public class PriceTest {

    @Test(expected = IllegalArgumentException.class)
    public void constructorEpicNull() throws Exception{
        new Price(null, "200015-Q1", "4.89", "GBP");
    }

    @Test(expected = IllegalArgumentException.class)
    public void constructorDateTimeNull () throws Exception{
        new Price("III", null, "4.89", "GBP");
    }

    @Test(expected = IllegalArgumentException.class)
    public void constructorMidPriceNull() throws Exception{
        new Price("III", "200015-Q1", null, "GBP");
    }

    @Test(expected = IllegalArgumentException.class)
    public void constructorCurrencyNull() throws Exception{
        new Price("III", "200015-Q1", "4.89", null);
    }

    @Test
    public void constructPrice() throws Exception {
        Price price = new Price("III", "200015-Q1", "4.89", "GBP");
        assertThat(price.getEpic(), equalTo("III"));
        assertThat(price.getDateTime(), equalTo("200015-Q1"));
        assertThat(price.getMidPrice(), equalTo("4.89"));
        assertThat(price.getCurrency(), equalTo("GBP"));
    }
}
