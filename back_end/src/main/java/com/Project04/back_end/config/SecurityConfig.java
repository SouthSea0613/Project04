package com.Project04.back_end.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public UserDetailsService userDetailsService(PasswordEncoder passwordEncoder) {
        UserDetails userDetails = User.builder()
                .username("user")
                .password(passwordEncoder.encode("password"))
                .roles("USER")
                .build();
        UserDetails admin = User.builder()
                .username("admin")
                .password(passwordEncoder.encode("admin"))
                .roles("USER", "ADMIN")
                .build();

        return new InMemoryUserDetailsManager(userDetails, admin);
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {
        httpSecurity
                .csrf(AbstractHttpConfigurer::disable);
        /*
                .authorizeHttpRequests(authorize -> authorize
                    .requestMatchers("/css/**", "/js/**", "/images/**", "/", "/home", "/login", "/error").permitAll() // 정적 리소스 및 특정 경로는 모두 허용
                    .requestMatchers("/users").hasRole("USER") // /users 경로는 USER 역할 필요
                    .requestMatchers("/admin/**").hasRole("ADMIN") // /admin/** 경로는 ADMIN 역할 필요
                    .anyRequest().authenticated() // 그 외 모든 요청은 인증 필요
                )
                .formLogin(formLogin -> formLogin
                    .loginPage("/login") // 커스텀 로그인 페이지 경로
                    .loginProcessingUrl("/perform_login") // 로그인 처리 URL (Spring Security가 처리)
                    .defaultSuccessUrl("/users", true) // 로그인 성공 시 이동할 기본 페이지
                    .failureUrl("/login?error=true") // 로그인 실패 시 이동할 페이지
                    .permitAll()
                )
                .logout(logout -> logout
                    .logoutRequestMatcher(new AntPathRequestMatcher("/logout")) // 커스텀 로그아웃 URL
                    .logoutSuccessUrl("/login?logout=true") // 로그아웃 성공 시 이동할 페이지
                    .invalidateHttpSession(true) // 세션 무효화
                    .deleteCookies("JSESSIONID") // 쿠키 삭제
                    .permitAll()
                );
        */

        return httpSecurity.build();
    }
}
