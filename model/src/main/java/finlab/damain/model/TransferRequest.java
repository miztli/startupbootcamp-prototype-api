package finlab.damain.model;

/**
 * Created by miztli on 27/01/18.
 */
public class TransferRequest {
    private String account;
    private String trans_type;
    private String fromaccountnumber;
    private String toaccountnumber;
    private String amount;
    private String reference;

    public TransferRequest() {
        super();
    }

    public String getAccount() {
        return account;
    }

    public void setAccount(String account) {
        this.account = account;
    }

    public String getTrans_type() {
        return trans_type;
    }

    public void setTrans_type(String trans_type) {
        this.trans_type = trans_type;
    }

    public String getFromaccountnumber() {
        return fromaccountnumber;
    }

    public void setFromaccountnumber(String fromaccountnumber) {
        this.fromaccountnumber = fromaccountnumber;
    }

    public String getToaccountnumber() {
        return toaccountnumber;
    }

    public void setToaccountnumber(String toaccountnumber) {
        this.toaccountnumber = toaccountnumber;
    }

    public String getAmount() {
        return amount;
    }

    public void setAmount(String amount) {
        this.amount = amount;
    }

    public String getReference() {
        return reference;
    }

    public void setReference(String reference) {
        this.reference = reference;
    }
}
