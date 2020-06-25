package uk.co.pm.model;

import org.junit.Test;

import static org.hamcrest.CoreMatchers.equalTo;
import static org.junit.Assert.*;

public class JUnitEquityTest {

    @Test
    public void testConstructingEquity() throws Exception{
        String expectedEpic = "III";
        String expectedCompany = "3I GROUP PLC";
        String expectedAssetType = "Equity";
        String expectedSector = "Financials";
        String expectedCurrency = "GBP";

        Equity equity = new Equity(expectedEpic, expectedCompany, expectedAssetType, expectedSector, expectedCurrency);

        assertThat(equity.getEpic(), equalTo(expectedEpic));
        assertThat(equity.getCompanyName(), equalTo(expectedCompany));
        assertThat(equity.getAssetType(), equalTo(expectedAssetType));
        assertThat(equity.getSector(), equalTo(expectedSector));
        assertThat(equity.getCurrency(), equalTo(expectedCurrency));
    }

    @Test
    public void testEpic() throws Exception {
        Equity equity = new Equity();
        equity.setEpic("III");
        assertThat(equity.getEpic(), equalTo("III"));
    }

    @Test
    public void testCompanyName() throws Exception {
        Equity equity = new Equity();
        equity.setCompanyName("3I GROUP PLC");
        assertThat(equity.getCompanyName(), equalTo("3I GROUP PLC"));
    }

    @Test
    public void testAssetType() throws Exception {
        Equity equity = new Equity();
        equity.setAssetType("Equity");
        assertThat(equity.getAssetType(), equalTo("Equity"));
    }

    @Test
    public void testSector() throws Exception {
        Equity equity = new Equity();
        equity.setSector("Financials");
        assertThat(equity.getSector(), equalTo("Financials"));
    }

    @Test
    public void testCurrency() throws Exception {
        Equity equity = new Equity();
        equity.setCurrency("GBP");
        assertThat(equity.getCurrency(), equalTo("GBP"));
    }

}