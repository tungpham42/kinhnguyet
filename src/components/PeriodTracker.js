import React, { useState, useEffect } from "react";
import { Container, Form, Card } from "react-bootstrap";
import { format, addDays } from "date-fns";

const PeriodTracker = () => {
  const [startDate, setStartDate] = useState(
    localStorage.getItem("startDate") || format(new Date(), "yyyy-MM-dd")
  );
  const [cycleLength, setCycleLength] = useState(
    parseInt(localStorage.getItem("cycleLength")) || 28
  );
  const [nextPeriod, setNextPeriod] = useState("");
  const [ovulationDay, setOvulationDay] = useState("");
  const [safeDays, setSafeDays] = useState([]);

  useEffect(() => {
    if (startDate) {
      const next = addDays(new Date(startDate), cycleLength);
      const ovulation = addDays(new Date(startDate), 14);
      const safeStart = addDays(new Date(startDate), 1);
      const safeEnd = addDays(new Date(startDate), 10);
      setNextPeriod(format(next, "yyyy-MM-dd"));
      setOvulationDay(format(ovulation, "yyyy-MM-dd"));
      setSafeDays([
        format(safeStart, "yyyy-MM-dd"),
        format(safeEnd, "yyyy-MM-dd"),
      ]);
    }
  }, [startDate, cycleLength]);

  return (
    <Container className="my-5 col-md-6 col-sm-10 col-12">
      <Card className="p-4 shadow-lg">
        <h3>Theo dõi chu kỳ kinh nguyệt</h3>
        <Form>
          <Form.Group>
            <Form.Label>Nhập ngày bắt đầu chu kỳ:</Form.Label>
            <Form.Control
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Label>Độ dài chu kỳ (mặc định 28 ngày):</Form.Label>
            <Form.Control
              type="number"
              value={cycleLength}
              onChange={(e) => setCycleLength(parseInt(e.target.value))}
            />
          </Form.Group>
        </Form>
        {nextPeriod && (
          <div className="mt-4">
            <h5>Chu kỳ tiếp theo: {nextPeriod}</h5>
            <h5>Ngày rụng trứng: {ovulationDay}</h5>
            <h5>
              Ngày an toàn: {safeDays[0]} - {safeDays[1]}
            </h5>
          </div>
        )}
      </Card>
    </Container>
  );
};

export default PeriodTracker;
