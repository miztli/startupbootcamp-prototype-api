package finlab.damain.model;

/**
 * Created by miztli on 27/01/18.
 */
public class TransferResponseData {
    private String code;
    private String message;
    private String everest_ref;

    public TransferResponseData() {
        super();
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getEverest_ref() {
        return everest_ref;
    }

    public void setEverest_ref(String everest_ref) {
        this.everest_ref = everest_ref;
    }

    @Override
    public String toString() {
        return String.format("code: %s, message: %s, everest_ref: %s", getCode(), getMessage(), getEverest_ref());
    }
}
