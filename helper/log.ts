export enum Logger {
    DELETE = "DELETE", // marron clair
    CREATE = "CREATE", // vert clair
    POST = "POST", // bleu foncé
    GET_ALL = "GET_ALL", // violet
    GET = "GET", // rose
    PUT = "PUT", // bleu clair
    WARNING = "WARNING", // jaune
    ERROR = "ERROR", // rouge
}

export default function logger(text: string, color?: Logger): void {
    if (color) {
        switch (color) {
            case Logger.DELETE:
                console.log("\u001b[38;5;208m" + text + "\u001b[0m"); // marron clair
                return;
            case Logger.CREATE:
                console.log("\u001b[32m" + text + "\u001b[0m"); // vert clair
                return;
            case Logger.POST:
                console.log("\u001b[34m" + text + "\u001b[0m"); // bleu foncé
                return;
            case Logger.GET_ALL:
                console.log("\u001b[35m" + text + "\u001b[0m"); // violet
                return;
            case Logger.GET:
                console.log("\u001b[38;5;198m" + text + "\u001b[0m"); // rose
                return;
            case Logger.PUT:
                console.log("\u001b[36m" + text + "\u001b[0m"); // bleu clair
                return;
            case Logger.WARNING:
                console.log("\u001b[33m" + text + "\u001b[0m"); // jaune
                return;
            case Logger.ERROR:
                console.log("\u001b[31m" + text + "\u001b[0m"); // rouge
                return;
        }
    }
    console.log(text);
}
