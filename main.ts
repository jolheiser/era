const ATOM1 = "█";
const ATOM2 = "■";

const TIME_WIDTH = 39;
const TIME_HEIGHT = 5;

const read_env_number = (name: string): number => {
  const env = Deno.env.get(name);
  if (env === null) {
    return 100;
  } else {
    return parseInt(env!);
  }
};

const read_env_str = (name: string): string => {
  const env = Deno.env.get(name);
  if (env === null) {
    return "│";
  } else {
    return env!;
  }
};

const INTERVAL = read_env_number("ERA_INTERVAL");
const FREQUENCY = read_env_number("ERA_FREQUENCY");
const RAIN1 = read_env_str("ERA_RAIN1");
const RAIN2 = read_env_str("ERA_RAIN2");

const ONE = [
  [0, 0, 1, 1, 0],
  [0, 0, 1, 1, 0],
  [0, 0, 1, 1, 0],
  [0, 0, 1, 1, 0],
  [0, 0, 1, 1, 0],
];

const TWO = [
  [1, 1, 1, 1, 1],
  [0, 0, 0, 1, 1],
  [1, 1, 1, 1, 1],
  [1, 1, 0, 0, 0],
  [1, 1, 1, 1, 1],
];

const THREE = [
  [1, 1, 1, 1, 1],
  [0, 0, 0, 1, 1],
  [1, 1, 1, 1, 1],
  [0, 0, 0, 1, 1],
  [1, 1, 1, 1, 1],
];

const FOUR = [
  [1, 1, 0, 1, 1],
  [1, 1, 0, 1, 1],
  [1, 1, 1, 1, 1],
  [0, 0, 0, 1, 1],
  [0, 0, 0, 1, 1],
];

const FIVE = [
  [1, 1, 1, 1, 1],
  [1, 1, 0, 0, 0],
  [1, 1, 1, 1, 1],
  [0, 0, 0, 1, 1],
  [1, 1, 1, 1, 1],
];

const SIX = [
  [1, 1, 1, 1, 1],
  [1, 1, 0, 0, 0],
  [1, 1, 1, 1, 1],
  [1, 1, 0, 1, 1],
  [1, 1, 1, 1, 1],
];

const SEVEN = [
  [1, 1, 1, 1, 1],
  [1, 1, 0, 1, 1],
  [0, 0, 0, 1, 1],
  [0, 0, 0, 1, 1],
  [0, 0, 0, 1, 1],
];

const EIGHT = [
  [1, 1, 1, 1, 1],
  [1, 1, 0, 1, 1],
  [1, 1, 1, 1, 1],
  [1, 1, 0, 1, 1],
  [1, 1, 1, 1, 1],
];

const NINE = [
  [1, 1, 1, 1, 1],
  [1, 1, 0, 1, 1],
  [1, 1, 1, 1, 1],
  [0, 0, 0, 1, 1],
  [1, 1, 1, 1, 1],
];

const ZERO = [
  [1, 1, 1, 1, 1],
  [1, 1, 0, 1, 1],
  [1, 1, 0, 1, 1],
  [1, 1, 0, 1, 1],
  [1, 1, 1, 1, 1],
];

const COLON = [
  [0, 0, 0],
  [0, 2, 0],
  [0, 0, 0],
  [0, 2, 0],
  [0, 0, 0],
];

const generate_string_array = (num: number[][]): string[] => {
  const result: string[] = [];
  num.forEach((nums) => {
    let line = "";
    nums.forEach((num) => {
      if (num == 1) {
        line = line + ATOM1;
      } else if (num == 2) {
        line = line + ATOM2;
      } else {
        line = line + " ";
      }
    });
    result.push(line);
  });
  return result;
};

const concat_nums = ([
  num1,
  num2,
  num3,
  num4,
  num5,
  num6,
]: number[][][]): number[][] => {
  const result: number[][] = [];
  for (let i = 0; i < 5; i++) {
    const first = [...num1[i], 0];
    const third = [...num3[i], 0];
    const fifth = [...num5[i], 0];
    const line = first.concat(
      num2[i],
      COLON[i],
      third,
      num4[i],
      COLON[i],
      fifth,
      num6[i]
    );
    result.push(line);
  }
  return result;
};

const make_time = (): number[][][] => {
  const time = new Date();
  const hour = time.getHours();
  const min = time.getMinutes();
  const sec = time.getSeconds();
  const first = Math.floor(hour / 10);
  const second = hour - first * 10;
  const third = Math.floor(min / 10);
  const fourth = min - third * 10;
  const fifth = Math.floor(sec / 10);
  const sixth = sec - fifth * 10;
  return [first, second, third, fourth, fifth, sixth].map((item) =>
    num_to_arrays(item)
  );
};

const num_to_arrays = (num: number): number[][] => {
  switch (num) {
    case 1:
      return ONE;
    case 2:
      return TWO;
    case 3:
      return THREE;
    case 4:
      return FOUR;
    case 5:
      return FIVE;
    case 6:
      return SIX;
    case 7:
      return SEVEN;
    case 8:
      return EIGHT;
    case 9:
      return NINE;
    default:
      return ZERO;
  }
};

const call_rain = (rain: string[], column: number, row: number): string[] => {
  if (rain.length >= row) {
    rain.pop();
  }
  let new_rain = "";
  for (let i = 0; i < column; i++) {
    new_rain = new_rain + make_drop(getRandomInt(FREQUENCY));
  }
  rain = [new_rain, ...rain];
  return rain;
};

const getRandomInt = (max: number): number => {
  return Math.floor(Math.random() * max);
};

const make_drop = (rand: number): string => {
  switch (rand) {
    case 0:
      return RAIN1;
    case 1:
      return RAIN2;
    default:
      return " ";
  }
};

const main = async () => {
  const { columns, rows } = Deno.consoleSize(Deno.stdout.rid);
  const start_x = Math.floor((columns - TIME_WIDTH) / 2);
  const start_y = Math.floor((rows - TIME_HEIGHT) / 2);
  Deno.setRaw(Deno.stdin.rid, true); //Enter raw mode
  const c = new Uint8Array(1);
  await Deno.stdout.write(new TextEncoder().encode("\x1b[?1049h")); //Enter new screen
  await Deno.stdout.write(new TextEncoder().encode("\x1b[?25l")); //Hide cursor
  for (let i = 0; i < 5; i++) {
    const txt = generate_string_array(concat_nums(make_time()));
    const move =
      "\x1b[" + (start_y + i).toString() + ";" + start_x.toString() + "f";
    await Deno.stdout.write(new TextEncoder().encode(move)); //Go to home position
    console.log(txt[i]);
  }
  let rain: string[] = [];
  const interval_rainID = setInterval(async () => {
    await Deno.stdout.write(new TextEncoder().encode("\x1b[1;1f")); //Go to home position
    rain = call_rain(rain, columns, rows);
    for (let i = 1; i < rain.length; i++) {
      if (i >= start_y && i < start_y + 5) {
        continue;
      }
      const move = "\x1b[" + i.toString() + ";" + "1f";
      await Deno.stdout.write(new TextEncoder().encode(move)); //Go to each rain-start position
      console.log(rain[i]);
    }
    for (let i = 0; i < 5; i++) {
      const txt = generate_string_array(concat_nums(make_time()));
      const move =
        "\x1b[" + (start_y + i).toString() + ";" + start_x.toString() + "f";
      await Deno.stdout.write(new TextEncoder().encode(move)); //Go to time-start position
      console.log(txt[i]);
    }
  }, INTERVAL);
  await Deno.stdin.read(c);
  clearInterval(interval_rainID);
  await Deno.stdout.write(new TextEncoder().encode("\x1b[?25h")); //Show cursor
  await Deno.stdout.write(new TextEncoder().encode("\x1b[?1049l")); //Restore main screen
  Deno.setRaw(Deno.stdin.rid, false); //Exit raw mode
  return;
};

await main();
