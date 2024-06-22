import Ticket from "../../src/domain/Ticket";

test("Deve cancelar um ingresso", function () {
	const ticket = Ticket.create("", "john.doe@gmail.com", 100);
	ticket.cancel();
	expect(ticket.getStatus()).toBe("cancelled");
});

test("Não deve criar um ticket com email inválido", function () {
	expect(() => Ticket.create("", "john.doe", 100)).toThrow(new Error("Email inválido"));
});
