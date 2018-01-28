package finlab.damain.model;

/**
 * Created by miztli on 27/01/18.
 */
public class BalanceResponseData {

    private String accountHolderName;
    private String entityId;
    private String accountType;
    private String everest_ref;

    public BalanceResponseData() {
        super();
    }

    public String getAccountHolderName() {
        return accountHolderName;
    }

    public void setAccountHolderName(String accountHolderName) {
        this.accountHolderName = accountHolderName;
    }

    public String getEntityId() {
        return entityId;
    }

    public void setEntityId(String entityId) {
        this.entityId = entityId;
    }

    public String getAccountType() {
        return accountType;
    }

    public void setAccountType(String accountType) {
        this.accountType = accountType;
    }

    public String getEverest_ref() {
        return everest_ref;
    }

    public void setEverest_ref(String everest_ref) {
        this.everest_ref = everest_ref;
    }

    @Override
    public String toString() {
        return String.format("account holder name: %s, entity id: %s, account type: %s, everest ref: %s", getAccountHolderName(), getEntityId(), getAccountType(), getEverest_ref());
    }
}
