import crypto from "crypto";

export default function getMd5Hash(result: any): string {
    const resultString = JSON.stringify(result);
    const hash = crypto.createHash("md5").update(resultString).digest("hex");
    return hash;
}
