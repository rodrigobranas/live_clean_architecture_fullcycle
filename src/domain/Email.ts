export default class Email {
	value: string;

	constructor (email: string) {
		if (!email.match(/.+@.+/)) throw new Error("Email inválido");
		this.value = email;
	}

}
