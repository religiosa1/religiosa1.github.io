---
title: "Расчёт конденсатора для линейного БП"
---

<!-- t = 10мс при 50Гц (диодный мост повысит частоту до 100, 1/100 = 0.010 секунды) -->
<math>
  <mi>t</mi>
  <mo>=</mo>
  <mn>10</mn>
  <mi>мс</mi>
</math>

при 50Гц  (диодный мост повысит частоту до 100, 1/100 = 0.010 секунды)

<!-- t = 8.3мс при 60 Гц -->
<math>
  <mi>t</mi>
  <mo>=</mo>
  <mn>8.3</mn>
  <mi>мс</mi>
</math>

при 60 Гц

<!-- Q = I∗t,C∗ΔV -->
<math>
  <mi>Q</mi>
  <mo>=</mo>
  <mi>I</mi>
  <mi>t</mi>
  <mo>,</mo>
  <mi>C</mi>
  <mi>ΔV</mi>
</math>

[отсюда](http://www.electro-tech-online.com/threads/how-to-calculate-the-value-of-a-smoothing-capacitor.106374/)

<!-- C=I∗t/ΔV. -->
<math>
  <mi>C</mi>
  <mo>=</mo>
  <mfrac>
    <mrow>
      <mi>I</mi>
      <mi>t</mi>
    </mrow>
    <mi>&Delta;V</mi>
  </mfrac>
</math>

Для 2А БП при 60Гц входного тока, при использование полноволнового выпрямителя и допустимом падении напряжения на 3В в фильтре:

<!-- C=2∗0.008/3=0.0053F=5300uF -->
<math>
  <mi>C</mi>
  <mo>=</mo>
  <mfrac>
    <mrow>
      <mn>2</mn>
      <mo>×</mo>
      <mn>0.008</mn>
    </mrow>
    <mn>3</mn>
  </mfrac>
  <mo>=</mo>
  <mn>0.0053</mn>
  <mi>F</mi>
  <mo>=</mo>
  <mn>5300</mn>
  <mi>uF</mi>
</math>

[отсюда](http://www.schoolphysics.co.uk/age16-19/Electricity%20and%20magnetism/Electrostatics/text/Capacitor_charge_and_discharge_mathematics/index.html)


Общая формула для расчета напряжения V остающимся при разрядке конденсатора с емкостью C и начальном заряженном напряжение V<sub>0</sub> , за время t, через нагрузку с сопротивлением R:

<!-- V=Voe−(t/RC) -->
<math>
  <mi>V</mi>
  <mo>=</mo>
  <msub><mi>V</mi><mn>0</mn></msub>
  <mo>e</mo>
  <mrow>
    <mo>-</mo>
    <mo stretchy="true">(</mo>
    <mfrac>
      <mrow>
        <mi>t</mi>
      </mrow>
      <mrow>
        <mi>R</mi>
        <mi>C</mi>
      </mrow>
    </mfrac>
    <mo stretchy="true">)</mo>
  </mrow>
</math>

Из нее выводим формулу для расчета времени t, за которое напряжение на конденсаторе емкостью C, упадет с начального напряжения V<sub>0</sub> до напряжение V, через нагрузку с сопротивлением R:

<!-- t=ln(V0/V)∗RC -->
<math>
  <mi>t</mi>
  <mo>=</mo>
  <mi>ln</mi>
  <mo stretchy="true">(</mo>
  <mfrac>
    <msub><mi>V</mi><mn>0</mn></msub>
    <mi>V</mi>
  </mfrac>
  <mo stretchy="true">)</mo>
  <mi>R</mi>
  <mi>C</mi>
</math>

Из нее же выводим формулу для расчета емкости конденсатора, на котором за время t напряжение упадет с V0 до V через нагрузку с сопротивлением R:

<!-- C=t/(ln(V0/V)∗R) -->
<math>
  <mi>C</mi>
  <mo>=</mo>
  <mfrac>
    <mrow>
      <mi>t</mi>
    </mrow>
    <mrow>
      <mi>ln</mi>
      <mo stretchy="true">(</mo>
      <mfrac>
        <msub><mi>V</mi><mn>0</mn></msub>
        <mi>V</mi>
      </mfrac>
      <mo stretchy="true">)</mo>
      <mi>R</mi>
    </mrow>
  </mfrac>
</math>