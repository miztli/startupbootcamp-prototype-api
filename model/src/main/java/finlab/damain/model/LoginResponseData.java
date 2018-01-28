package finlab.damain.model;

/**
 * Created by miztli on 27/01/18.
 */
public class LoginResponseData {

    private String everest_ref;

    public LoginResponseData() {
        super();
    }

    public String getEverest_ref() {
        return everest_ref;
    }

    public void setEverest_ref(String everest_ref) {
        this.everest_ref = everest_ref;
    }

    @Override
    public String toString() {
        return String.format("everest ref: %s", getEverest_ref());
    }
}
