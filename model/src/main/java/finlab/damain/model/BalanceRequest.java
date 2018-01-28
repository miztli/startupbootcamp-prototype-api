package finlab.damain.model;

/**
 * Created by miztli on 27/01/18.
 */
public class BalanceRequest {

    private String trans_type;
    private String account;
    private String custaccount;

    public BalanceRequest() {
        super();
    }

    public String getTrans_type() {
        return trans_type;
    }

    public void setTrans_type(String trans_type) {
        this.trans_type = trans_type;
    }

    public String getAccount() {
        return account;
    }

    public void setAccount(String account) {
        this.account = account;
    }

    public String getCustaccount() {
        return custaccount;
    }

    public void setCustaccount(String custaccount) {
        this.custaccount = custaccount;
    }
}
