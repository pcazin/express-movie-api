export default function logger(text: string, color?: string): void {
    if (color) {
        switch (color) {
            case "red":
                console.log("\u001b[31m" + text + "\u001b[0m");
                return;
            case "green":
                console.log("\u001b[32m" + text + "\u001b[0m");
                return;
            case "yellow":
                console.log("\u001b[33m" + text + "\u001b[0m");
                return;
            case "blue":
                console.log("\u001b[34m" + text + "\u001b[0m");
                return;
        }
    }
    console.log(text);
}
