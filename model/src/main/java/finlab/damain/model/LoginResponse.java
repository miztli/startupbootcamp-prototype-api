package finlab.damain.model;

/**
 * Created by miztli on 27/01/18.
 */
public class LoginResponse extends Response{

    private LoginResponseData data;

    public LoginResponse() {
        super();
    }

    public LoginResponseData getData() {
        return data;
    }

    public void setData(LoginResponseData data) {
        this.data = data;
    }
}
