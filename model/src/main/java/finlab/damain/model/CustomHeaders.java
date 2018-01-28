package finlab.damain.model;

/**
 * Created by miztli on 27/01/18.
 */
public enum CustomHeaders {
    X_ACCESS_TOKEN("x-access-token");

    private String header;

    CustomHeaders(String header) {
        this.header = header;
    }

    public String getHeader() {
        return header;
    }

    public void setHeader(String header) {
        this.header = header;
    }
}
