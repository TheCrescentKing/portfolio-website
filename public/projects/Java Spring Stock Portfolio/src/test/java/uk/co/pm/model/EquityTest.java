package uk.co.pm.model;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;
import static org.hamcrest.CoreMatchers.equalTo;

import org.junit.Test;
import uk.co.pm.model.Equity;

public class EquityTest {

    @Test(expected = IllegalArgumentException.class)
    public void constructorEpicNull() throws Exception{
        new Equity(null, "3I GROUP PLC", "Equity", "Financials", "GBP");
    }

    @Test(expected = IllegalArgumentException.class)
    public void constructorCompanyNull () throws Exception{
        new Equity("III", null, "Equity", "Financials", "GBP");
    }

    @Test(expected = IllegalArgumentException.class)
    public void constructorAssetNull() throws Exception{
        new Equity("III", "3I GROUP PLC", null, "Financials", "GBP");
    }

    @Test(expected = IllegalArgumentException.class)
    public void constructorSectorNull() throws Exception{
        new Equity("III", "3I GROUP PLC", "Equity", null, "GBP");
    }

    @Test(expected = IllegalArgumentException.class)
    public void constructorCurrencyNull() throws Exception{
        new Equity("III", "3I GROUP PLC", "Equity", "Financials", null);
    }

    @Test
    public void constructEquity() throws Exception {
        Equity equity = new Equity("III", "3I GROUP PLC", "Equity", "Financials", "GBP");
        assertThat(equity.getEpic(), equalTo("III"));
        assertThat(equity.getCompanyName(), equalTo("3I GROUP PLC"));
        assertThat(equity.getAssetType(), equalTo("Equity"));
        assertThat(equity.getSector(), equalTo("Financials"));
        assertThat(equity.getCurrency(), equalTo("GBP"));
    }
}
