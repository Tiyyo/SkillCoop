import logger from "../app/helpers/logger";



async function seed() {
    logger.info('Start seeding')

    logger.info("Database has been seed")
}


seed().catch((err) => {
    logger.error("Seeding has failed" + err)
})