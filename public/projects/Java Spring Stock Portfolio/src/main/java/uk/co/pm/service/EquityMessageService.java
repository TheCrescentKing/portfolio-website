package uk.co.pm.service;

import uk.co.pm.model.Equity;
import uk.co.pm.model.HelloReference;

public class EquityMessageService {

    public static HelloReference getEquityMessage(final Equity equity) {
        if (equity == null)
            throw new IllegalArgumentException("Equity cannot be null");
        if(equity.getEpic() == null || "".equals(equity.getEpic()))
            throw new IllegalArgumentException("Equity must have EPIC");
        if(equity.getAssetType() == null || "".equals((equity.getAssetType())))
            throw new IllegalArgumentException(("Equity must have Asset Type"));
        if(equity.getCompanyName() == null || "".equals(equity.getCompanyName()))
            throw new IllegalArgumentException(("Equity must have Company Name"));
        if(equity.getCurrency() == null || "".equals(equity.getCurrency()))
            throw new IllegalArgumentException(("Equity must have Currency"));
        if (equity.getSector() == null || "".equals((equity.getSector())))
            throw new IllegalArgumentException("Equity must have Sector");

        return new HelloReference("Equity: \n EPIC = '" + equity.getEpic() + '\'' +
                ", Company Name= '" + equity.getCompanyName() + '\'' +
                ", Asset Type= '" + equity.getAssetType() + '\'' +
                ", Sector= '" + equity.getSector() + '\'' +
                ", Currency= '" + equity.getCurrency() + "'");
    }
}
