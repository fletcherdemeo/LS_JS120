class Banner {
  static HORIZONTAL_LINE = '-';
  static SPACE = ' ';
  static DEFAULT_BUFFER = 2;

  constructor(message, desiredWidth = null) {
    this.message = message;
    this.messages = message.split(' ');
    this.desiredWidth = (
      desiredWidth || (message.length + Banner.DEFAULT_BUFFER)
    );
    this.line = [];
    this.lines = [];
  }

  displayBanner() {
    console.log(
      [
        this.horizontalRule(),
        this.emptyLine(),
        this.messageLine(),
        this.emptyLine(),
        this.horizontalRule()
      ].join("\n")
    );
  }

  horizontalRule() {
    return `+${Banner.HORIZONTAL_LINE.repeat(this.desiredWidth)}+`;
  }

  emptyLine() {
    return `|${Banner.SPACE.repeat(this.desiredWidth)}|`;
  }

  centerMessage(message) {
    message = message || this.message;

    let maxLineLength = this.desiredWidth - Banner.DEFAULT_BUFFER;
    let pad = (maxLineLength - message.length) / 2;
    let padLeft = ' '.repeat(Math.floor(pad));
    let padRight = ' '.repeat(Math.ceil(pad));

    return `| ${padLeft}${message}${padRight} |`;
  }

  getMaxLineLength() {
    return this.desiredWidth - Banner.DEFAULT_BUFFER;
  }

  splitWord(word) {
    let maxLineLength = this.getMaxLineLength();
    let firstPart = word.slice(0, maxLineLength - 1);
    let remaining = word.replace(firstPart, '');
    return [firstPart, remaining];
  }

  getLineLength() {
    return this.line.join(' ').length;
  }

  getMessagesLength() {
    return this.messages.length;
  }

  addWordToLine(word) {
    this.line.push(word);
  }

  setNewLine(word) {
    this.line = [word];
  }

  addLineToLines(line) {
    this.lines.push(line);
  }

  splitMessage() {
    while (this.getMessagesLength() > 0) {
      let word = this.messages[0];

      if (word.length > this.getMaxLineLength()) {
        let [firstPart, remaining] = this.splitWord(word);
        this.addLineToLines(firstPart + '-');
        this.messages.splice(0, 1, remaining);
        continue;
      }

      if ((this.getLineLength() + word.length) < this.getMaxLineLength()) {
        this.addWordToLine(word);
      } else {
        this.addLineToLines(this.line.join(' '));
        this.setNewLine(word);
      }

      this.messages.splice(0, 1);
    }

    this.addLineToLines(this.line.join(' '));
    return this.lines.map(line => this.centerMessage(line)).join('\n');
  }

  messageLine() {
    let messageWidth = this.message.length + Banner.DEFAULT_BUFFER;

    if (this.desiredWidth > messageWidth) {
      return this.centerMessage();
    } else if (this.desiredWidth < messageWidth) {
      return this.splitMessage();
    }

    return `| ${this.message} |`;
  }
}

let string = 
'Four score and seven years ago, our fathers brought forth ' +
'upon this continent a new nation, conceived in liberty, and ' +
'dedicated to the principle that all men are created equal.';

let banner = new Banner(string, 40);
banner.displayBanner();

banner = new Banner(string, 20);
banner.displayBanner();

banner = new Banner(string, 7);
banner.displayBanner();