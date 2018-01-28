package finlab.damain.model;

/**
 * Created by miztli on 27/01/18.
 */
public class SessionResponse extends Response{
    private String token;
    private String status;
    private String[] languages;

    public SessionResponse() {
        super();
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String[] getLanguages() {
        return languages;
    }

    public void setLanguages(String[] languages) {
        this.languages = languages;
    }
}
