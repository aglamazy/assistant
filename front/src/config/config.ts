import Joi from 'joi';

// Define the schema
const envVarsSchema = Joi.object({
    BACKEND_SERVER: Joi.string().default('http://localhost:3010')
}).unknown();

export interface Config {
    backendServer: string;  // Use camelCase for TypeScript properties
}

export let config: Config;

export const checkConfig = () => {
    const { value: envVars, error } = envVarsSchema.validate(process.env, {
        allowUnknown: true,  // Allows the object to contain other properties
        stripUnknown: true,  // Removes unknown properties
        convert: true        // Convert types and apply defaults
    });

    if (error) {
        throw new Error(`Config validation error: ${error.message}`);
    }

    // Log the configuration, consider environment sensitivities
    console.log('Configuration validated successfully:', envVars);

    // Map validated environment variables to the config structure
    config = {
        backendServer: envVars.BACKEND_SERVER
    };
};
