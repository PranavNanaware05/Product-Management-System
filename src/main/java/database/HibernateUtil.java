
package database;

import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

public class HibernateUtil {

    private static SessionFactory factory;

    static {

        try {

            factory =
                new Configuration()
                .configure("hibernate.cfg.xml")
                .buildSessionFactory();

            System.out.println(
                "Hibernate Connected Successfully"
            );

        }

        catch(Exception e) {

            e.printStackTrace();
        }
    }

    public static SessionFactory getFactory() {

        return factory;
    }
}

