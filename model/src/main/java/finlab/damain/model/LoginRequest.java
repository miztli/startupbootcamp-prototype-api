package finlab.damain.model;

/**
 * Created by miztli on 27/01/18.
 */
public class LoginRequest {

    private String username;
    private String password;
    private String action;

    public LoginRequest() {
        super();
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }
}
