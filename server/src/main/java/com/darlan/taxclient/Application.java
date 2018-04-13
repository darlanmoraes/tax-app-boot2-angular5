package com.darlan.taxclient;

import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;

import java.util.Collections;
import java.util.stream.Stream;

import org.springframework.core.Ordered;
import org.springframework.data.rest.core.event.ValidatingRepositoryEventListener;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

/**
 * Created by darlan on 13/04/18.
 */
@EnableAutoConfiguration
@EnableResourceServer
@SpringBootApplication
public class Application extends RepositoryRestConfigurerAdapter {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    @Bean
    public ApplicationRunner init(final ClientRepository repository) {
        return args -> {
            Stream.of("Nome 1:1000:Rua ABC 1:C",
                      "Nome 2:2000:Rua ABC 2:C",
                      "Nome 3:5000:Rua ABC 3:B",
                      "Nome 4:7000:Rua ABC 4:B",
                      "Nome 5:9000:Rua ABC 5:A").forEach(data -> {
                final String[] part = data.split(":");
                final Client client = new Client();
                client.setName(part[0]);
                client.setSalary(Float.valueOf(part[1]));
                client.setAddress(part[2]);
                client.setRisk(Client.Risk.valueOf(part[3]));
                repository.save(client);
            });
            repository.findAll().forEach(System.out::println);
        };
    }

    @Bean
    @SuppressWarnings("unchecked")
    public FilterRegistrationBean simpleCorsFilter() {
        final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        final CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.setAllowedOrigins(Collections.singletonList("http://localhost:4200"));
        config.setAllowedMethods(Collections.singletonList("*"));
        config.setAllowedHeaders(Collections.singletonList("*"));
        source.registerCorsConfiguration("/**", config);
        final FilterRegistrationBean bean = new FilterRegistrationBean(new CorsFilter(source));
        bean.setOrder(Ordered.HIGHEST_PRECEDENCE);
        return bean;
    }

    @Override
    public void configureValidatingRepositoryEventListener(final ValidatingRepositoryEventListener validatingListener) {
        validatingListener.addValidator("beforeCreate", new ClientInterceptor());
        validatingListener.addValidator("beforeSave", new ClientInterceptor());
    }

}
