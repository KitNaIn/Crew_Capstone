package de.neuefische.backend.service;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import static org.junit.jupiter.api.Assertions.*;
@ExtendWith(SpringExtension.class)
@SpringBootTest
class GenerateUUIDServiceTest {

    GenerateUUIDService generateUUIDService = new GenerateUUIDService();

    @Test
    void testGenerateUUID_returns_uuid() {
        String actualUUID = generateUUIDService.generateUUID();

        assertNotNull(actualUUID);
    }

}