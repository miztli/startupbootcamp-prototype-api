package banregio.domain.model;

import java.io.Serializable;

/**
 * Created by miztli on 27/01/18.
 */
public class UserDto implements Serializable{
    private Long id;
    private String name;
    private String username;

    public UserDto() {
        super();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
