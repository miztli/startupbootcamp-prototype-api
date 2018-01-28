package finlab.damain.model;

/**
 * Created by miztli on 27/01/18.
 */
public class GenericResponse {

    private Object object;

    public GenericResponse(final Object object) {
        super();
        this.object = object;
    }

    public Object getObject() {
        return object;
    }

    public void setObject(Object object) {
        this.object = object;
    }
}
