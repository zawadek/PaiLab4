package com.example.pailab4.entities;

import com.example.pailab4.utils.Views;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Student {

    @GeneratedValue
    @Id
    private Long Id;

    @JsonView(Views.Public.class)
    private String name;

    @JsonView(Views.Public.class)
    private String surname;

    @JsonView(Views.Public.class)
    private double average;
}
