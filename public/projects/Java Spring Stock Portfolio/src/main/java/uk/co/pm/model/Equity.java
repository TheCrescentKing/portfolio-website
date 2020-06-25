package uk.co.pm.model;

import com.google.gson.annotations.SerializedName;

public class Equity {
    @SerializedName("EPIC")
    private String epic;
    @SerializedName("Company Name")
    private String companyName;
    @SerializedName("Asset Type")
    private String assetType;
    @SerializedName("Sector")
    private String sector;
    @SerializedName("Currency")
    private String currency;

    public Equity(){
    }

    public String getEpic() {
        return epic;
    }

    public void setEpic(String epic) {
        this.epic = epic;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getAssetType() {
        return assetType;
    }

    public void setAssetType(String assetType) {
        this.assetType = assetType;
    }

    public String getSector() {
        return sector;
    }

    public void setSector(String sector) {
        this.sector = sector;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public Equity(String epic, String companyName, String assetType, String sector, String currency) {
    if (epic == null || epic.equals("") || companyName == null || companyName.equals("") || assetType == null || assetType.equals("") || sector == null || sector.equals("") || currency == null || currency.equals(""))
        throw new IllegalArgumentException();
    this.epic = epic;
    this.companyName = companyName;
    this.assetType = assetType;
    this.sector = sector;
    this.currency = currency;
    }

    @Override
    public String toString() {
        return "uk.co.pm.model.Equity{" +
                "EPIC='" + epic + '\'' +
                ", Company Name=" + companyName + '\'' +
                ", Asset Type=" + assetType + '\'' +
                ", Sector=" + sector + '\'' +
                ", Currency=" + currency +
                '}';
    }
}
