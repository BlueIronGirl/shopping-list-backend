package de.shoppinglist.repository;

import de.shoppinglist.entity.Artikel;
import de.shoppinglist.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 * Repository for the Artikel-Entity
 */
public interface ArtikelRepository extends JpaRepository<Artikel, Long> {
    @Query("select artikel from Artikel artikel " +
            "where ?1 MEMBER OF artikel.einkaufszettel.owners " +
            "or ?2 MEMBER OF artikel.einkaufszettel.sharedWith"
    )
    List<Artikel> findByGekauftTrueAndEinkaufszettel_Owners_IdOrEinkaufszettel_SharedWith_Id(User owner, User sharedWith);
}
