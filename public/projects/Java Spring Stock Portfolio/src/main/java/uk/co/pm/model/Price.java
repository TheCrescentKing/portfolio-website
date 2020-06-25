package uk.co.pm.model;

import com.google.gson.annotations.SerializedName;

public class Price {

    @SerializedName("EPIC")
    private String epic;
    @SerializedName("Date Time")
    private String dateTime;
    @SerializedName("Mid Price")
    private String midPrice;
    @SerializedName("Currency")
    private String currency;

    public Price() {
    }

    public Price(String epic, String dateTime, String midPrice, String currency) {
        if (epic == null || epic.equals("") || dateTime == null || dateTime.equals("") || midPrice == null || midPrice.equals("") || currency == null || currency.equals("")) {
            throw new IllegalArgumentException();
        }
        this.epic = epic;
        this.dateTime = dateTime;
        this.midPrice = midPrice;
        this.currency = currency;
    }

    public String getEpic() {
        return epic;
    }

    public void setEpic(String epic) {
        this.epic = epic;
    }

    public String getDateTime() {
        return dateTime;
    }

    public void setDateTime(String dateTime) {
        this.dateTime = dateTime;
    }

    public String getMidPrice() {
        return midPrice;
    }

    public void setMidPrice(String midPrice) {
        this.midPrice = midPrice;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    @Override
    public String toString() {
        return "uk.co.pm.model.Price{" +
                "EPIC='" + epic + '\'' +
                ", Date Time=" + dateTime + '\'' +
                ", Mid Price=" + midPrice + '\'' +
                ", Currency=" + currency +
                '}';
    }
}
