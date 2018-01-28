package finlab.damain.model;

/**
 * Created by miztli on 27/01/18.
 */
public class TransferResponse extends Response {

    private TransferResponseData data;

    public TransferResponse() {
        super();
    }

    public TransferResponseData getData() {
        return data;
    }

    public void setData(TransferResponseData data) {
        this.data = data;
    }
}
