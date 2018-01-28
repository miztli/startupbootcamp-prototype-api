package finlab.damain.model;

/**
 * Created by miztli on 27/01/18.
 */
public class SessionRequest {

    private String organizationID;
    private String channel;
    private String application;
    private String username;

    public SessionRequest() {
        super();
    }

    public String getOrganizationID() {
        return organizationID;
    }

    public void setOrganizationID(String organizationID) {
        this.organizationID = organizationID;
    }

    public String getChannel() {
        return channel;
    }

    public void setChannel(String channel) {
        this.channel = channel;
    }

    public String getApplication() {
        return application;
    }

    public void setApplication(String application) {
        this.application = application;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
