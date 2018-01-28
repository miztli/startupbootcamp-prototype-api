package finlab.damain.model;

/**
 * Created by miztli on 27/01/18.
 */
public class Response {
    private String code;
    private String message;

    public Response() {
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
}
