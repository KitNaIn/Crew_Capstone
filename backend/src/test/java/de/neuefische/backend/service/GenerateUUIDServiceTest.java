package de.neuefische.backend.service;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest
class GenerateUUIDServiceTest {

    GenerateUUIDService generateUUIDService = new GenerateUUIDService();

    @Test
    void testGenerateUUID_returns_uuid() {
        String actualUUID = generateUUIDService.generateUUID();

        assertNotNull(actualUUID);
    }

}