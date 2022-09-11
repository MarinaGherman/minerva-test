const randomRGBAColor = ( opacity = 1) => {
  const o = Math.round; const r = Math.random; const s = 255;

  return {
    r: o(r()*s),
    g: o(r()*s),
    b: o(r()*s),
    a: opacity,
    getColor () {
      return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
    },
    setOpacity (newOpacity: number) {
      this.a = newOpacity;
    },
    getColorWithOpacity (newOpacity: number) {
      this.setOpacity(newOpacity);

      return this.getColor();
    }
  }
}

export default randomRGBAColor;
