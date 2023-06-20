package de.neuefische.backend.service;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class GenerateUUIDServiceTest {

    GenerateUUIDService generateUUIDService = new GenerateUUIDService();

    @Test
    void testGenerateUUID_returns_uuid() {
        String actualUUID = generateUUIDService.generateUUID();

        assertNotNull(actualUUID);
    }

}