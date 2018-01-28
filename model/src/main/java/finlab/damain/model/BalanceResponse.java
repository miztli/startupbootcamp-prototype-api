package finlab.damain.model;

/**
 * Created by miztli on 27/01/18.
 */

public class BalanceResponse extends Response{

    private BalanceResponseData data;

    public BalanceResponse() {
        super();
    }

    public BalanceResponseData getData() {
        return data;
    }

    public void setData(BalanceResponseData data) {
        this.data = data;
    }
}
