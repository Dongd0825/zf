/** 抽象coffee开发工厂 */
abstract class CoffeeFactory {
  abstract createCappuccinoCoffee(): CappuccinoCoffee;
  abstract createLatteCoffee(): LatteCoffee;
}

/** 抽象Cappuccino开发工厂 */
abstract class CappuccinoCoffee{
  abstract createCoffee();
}

/** 抽象Latte开发工厂 */
abstract class LatteCoffee{
  abstract createCoffee();
}

class StarbukCappuccinoCoffee extends CappuccinoCoffee{
  createCoffee() {
    return 'StarbukCappuccinoCoffee';
  }
}

class StarbukLatteCoffee extends LatteCoffee{
  createCoffee() {
    return 'StarbukLatteCoffee';
  }
}

class LukinCappuccinoCoffee extends CappuccinoCoffee{
  createCoffee() {
    return 'LukinCappuccinoCoffee';
  }
}

class LukinLatteCoffee extends LatteCoffee{
  createCoffee() {
    return 'LukinLatteCoffee';
  }
}

class StarbukFactory extends CoffeeFactory {
  createCappuccinoCoffee() {
    return new StarbukCappuccinoCoffee();
  }
  createLatteCoffee() {
    return new StarbukLatteCoffee();
  }
}

class luckinFactory extends CoffeeFactory {
  createCappuccinoCoffee() {
    return new StarbukCappuccinoCoffee();
  }
  createLatteCoffee() {
    return new StarbukLatteCoffee();
  }
}



