package com.darlan.taxclient;

import lombok.*;

import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.GeneratedValue;
import javax.persistence.Entity;

/**
 * Created by darlan on 13/04/18.
 */
@Entity
@Getter @Setter
@NoArgsConstructor
@ToString @EqualsAndHashCode
public class Client {

    enum Risk {
        A, B, C
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private @NonNull String name;
    private @NonNull Float salary;
    private @NonNull String address;
    private Risk risk;
}