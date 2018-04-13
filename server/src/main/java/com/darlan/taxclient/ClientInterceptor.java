package com.darlan.taxclient;

import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

/**
 * Created by darlan on 13/04/18.
 */
public class ClientInterceptor implements Validator {

    @Override
    public boolean supports(final Class<?> aClass) {
        return Client.class.isAssignableFrom(aClass);
    }

    @Override
    public void validate(final Object o, final Errors errors) {
        final Client client = (Client) o;
        final Float salary = client.getSalary();
        if (salary <= 2000) {
            client.setRisk(Client.Risk.C);
        } else if (salary > 2000 && salary <= 8000) {
            client.setRisk(Client.Risk.B);
        } else {
            client.setRisk(Client.Risk.A);
        }
    }

}
